const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Tạo và lưu trữ một user mới
exports.create = async (req, res, next) => {
    if (!req.body?.email) {
        return next(new ApiError(400, "Email không được để trống"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo tài khoản mới")
        );
    }
}; 

exports.login = async (req, res, next) => {
    if (!req.body?.email) {
        return next(new ApiError(400, "Email không được để trống"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.login(req.body);
        const data = {
            id: document[0]._id,
            role: document[0].role,
            createAt: document[0].createdAt,
        }
        if (document[0].email === req.body.email && document[0].password === req.body.password) {
            return res.send(data);
        }
        return res.send({});
    } catch (error) {
        return next(
            new ApiError(500, "Xảy ra lỗi khi login")
        );
    }
};


// Truy xuất tất cả các tài khoản từ cơ sở dữ liệu
exports.findAll =  async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        const { email } = req.query;
        if (email) {
            documents = await userService.findByEmail(email);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi truy xuất tài khoản")
        );
    }

    return res.send(documents);
}; 

// Tìm một tài khoản duy nhất với một id
exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Tài khoản không được tìm thấy"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi truy xuất sản phẩm với id=${req.params.id}`
            )
        );
    }
}; 

// Cập nhật tài khoản theo id
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu để cập nhật không được để trống"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Tài khoản không được tìm thấy"));
        }
        return res.send({ message: "Tài khoản đã được cập nhật thành công"});
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi cập nhật tài khoản với id=${req.params.id}`)
        );
    }
}; 

// Xóa tài khoản theo id
exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Tài khoản không được tìm thấy"));
        }
        return res.send({ message: "Tài khoản đã được xóa thành công"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Không thể xóa tài khoản với id=${req.params.id}`
            )
        );
    }
}; 

// Xóa tất cả các tài khoản từ CSDL
exports.deleteAll = async (_req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({
            message: `${deletedCount} Tài khoản đã được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả tài khoản")
        );
    }
}; 