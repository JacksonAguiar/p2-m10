"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const tsoa_1 = require("tsoa");
let UserController = class UserController extends tsoa_1.Controller {
    async create(data) {
        try {
            const { name, email } = data;
            const newUser = await user_1.User.create({ name, email });
            return newUser.toJSON();
        }
        catch (error) {
            this.setStatus(500);
            throw new Error(error.message);
        }
    }
    async get() {
        try {
            const users = await user_1.User.findAll();
            return users.map((user) => user.toJSON());
        }
        catch (error) {
            this.setStatus(500);
            throw new Error(error.message);
        }
    }
    async delete(id) {
        try {
            const user = await user_1.User.findByPk(id);
            if (!user) {
                this.setStatus(404);
                throw new Error('User not found');
            }
            await user.destroy();
            return `User with ID ${id} deleted successfully`;
        }
        catch (error) {
            this.setStatus(500);
            throw new Error(error.message);
        }
    }
    async update(id, data) {
        try {
            const user = await user_1.User.findByPk(id);
            if (!user) {
                this.setStatus(404);
                return null;
            }
            await user.update(data);
            return user.toJSON();
        }
        catch (error) {
            this.setStatus(500);
            throw new Error(error.message);
        }
    }
};
__decorate([
    (0, tsoa_1.SuccessResponse)('201', 'Created'),
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, tsoa_1.SuccessResponse)('200', ''),
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, tsoa_1.SuccessResponse)('200', 'Deleted'),
    (0, tsoa_1.Delete)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.SuccessResponse)('200', 'Updated'),
    (0, tsoa_1.Put)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
UserController = __decorate([
    (0, tsoa_1.Route)('/user')
], UserController);
exports.default = UserController;
