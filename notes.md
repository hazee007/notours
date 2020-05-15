APi fetures before adding to class api features...
1A. Filtering
const queryObj = { ...req.query };
const excludeFilds = ['page', 'sort', 'limit', 'fields'];
excludeFilds.forEach((ele) => delete queryObj[ele]);

     1B) Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

2.  Sorting
    if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
    } else {
    query = query.sort('-createdAt');
    }

3.  Limiting
    if (req.query.fields) {
    const field = req.query.fields.split(',').join(' ');
    query = query.select(field);
    } else {
    query = query.select('-\_\_v');
    }

4.  Pagination
    const page = req.query.page _ 1 || 1;
    const limit = req.query.limit _ 1 || 100;
    const skip = (page - 1) \* limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
          const numTours = await Tour.countDocuments();
          if (skip >= numTours) throw new Error('Page does not exist 🙅');
        }
