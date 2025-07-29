export const notFound = (req, res, next) => {
    const error =  new Error(`Not Found - ${req.orignalUrl}`)
    res.status(404);
    next(error)
}
