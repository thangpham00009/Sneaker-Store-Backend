export const PaginationService = {
  async paginate(model, options = {}) {
    const {
      page = 1,
      limit = 10,
      where = {},
      search,
      order = [["created_at", "DESC"]],
    } = options;

    const offset = (page - 1) * limit;
    const query = { where, limit, offset, order };

    if (search && search.key && search.value) {
      query.where[search.key] = { $like: `%${search.value}%` };
    }

    const { count, rows } = await model.findAndCountAll(query);

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
