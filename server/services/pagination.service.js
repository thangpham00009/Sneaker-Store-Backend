import { Op } from "sequelize";

export const PaginationService = {
  async paginate(model, options = {}) {
    const {
      page = 1,
      limit = 10,
      where = {},
      search,
      order = [["created_at", "DESC"]],
      include = [],
    } = options;

    const offset = (page - 1) * limit;

    if (search && search.key && search.value) {
      where[search.key] = { [Op.iLike]: `%${search.value}%` };
    }

    const { count, rows } = await model.findAndCountAll({
      where,
      limit,
      offset,
      order,
      include,
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  },
};
