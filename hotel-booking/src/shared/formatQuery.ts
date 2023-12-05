export function queryFormat(query: Object) {
    let queryJson = {};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete query[el]);
        
    if(query){
        let queryObject = JSON.stringify(query)
        queryObject = queryObject.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        queryJson = JSON.parse(queryObject)
    }
    return queryJson
}