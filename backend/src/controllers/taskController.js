const Task = require('../models/Task');
const { sendSuccess, sendError } = require('../utils/responseUtils');

/**
 * @desc    Create new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy: req.user.id,
    });

    sendSuccess(res, 201, 'Task created successfully', { task });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all tasks (with pagination and filtering)
 * @route   GET /api/v1/tasks
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;

    // Build query based on user role
    const query = req.user.role === 'admin' ? {} : { createdBy: req.user.id };

    // Add filters if provided
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const tasks = await Task.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    sendSuccess(res, 200, 'Tasks retrieved successfully', {
      tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalTasks: total,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!task) {
      return sendError(res, 404, 'Task not found');
    }

    // Check if user is authorized to view task
    if (
      req.user.role !== 'admin' &&
      task.createdBy._id.toString() !== req.user.id.toString()
    ) {
      return sendError(res, 403, 'Not authorized to view this task');
    }

    sendSuccess(res, 200, 'Task retrieved successfully', { task });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return sendError(res, 404, 'Task not found');
    }

    // Check if user is authorized to update task
    if (
      req.user.role !== 'admin' &&
      task.createdBy.toString() !== req.user.id.toString()
    ) {
      return sendError(res, 403, 'Not authorized to update this task');
    }

    // Update task
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    sendSuccess(res, 200, 'Task updated successfully', { task });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return sendError(res, 404, 'Task not found');
    }

    // Check if user is authorized to delete task
    if (
      req.user.role !== 'admin' &&
      task.createdBy.toString() !== req.user.id.toString()
    ) {
      return sendError(res, 403, 'Not authorized to delete this task');
    }

    await task.deleteOne();

    sendSuccess(res, 200, 'Task deleted successfully', null);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get task statistics (Admin only)
 * @route   GET /api/v1/tasks/stats
 * @access  Private/Admin
 */
const getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await Task.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalTasks = await Task.countDocuments();

    sendSuccess(res, 200, 'Task statistics retrieved successfully', {
      totalTasks,
      statusStats: stats,
      priorityStats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
};
