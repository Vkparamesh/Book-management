const IssuedBook = require("../dtos/book-dto");
const { UserModel, BookModel } = require("../models/index");

exports.getAllBooks = async (req, res) => {
    const books = await BookModel.find();
    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Book Found"
        })
    }
    return res.status(200).json({
        success: true,
        data: books,
    })
}

exports.getSingleBookbyid = async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id)

    if (!book) {
        res.status(404).json({ message: "book not found" })
    }
    return res.status(200).json({
        success: true,
        data: book,
    })
}

exports.getAllissuedBooks = async (req, res) => {
    const user = await UserModel.find({
        issuedBook: { $exist: true }
    }).populate("issuedBook")

    const issuedbooks = user.map((each) => new IssuedBook(each));
    if (issuedbooks.length === 0)
        return res.status(404).json({
            success: false,
            message: "no  issued book found"
        })


    return res.status(200).json({
        success: true,
        data: issuedbooks
    })

}