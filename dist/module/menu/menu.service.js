"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemService = void 0;
const data_source_1 = require("../../config/data-source");
const menu_entity_1 = require("./entities/menu.entity");
class MenuItemService {
    static async findAll() {
        return this.repo.find();
    }
    static async findOne(id) {
        return this.repo.findOneBy({ id });
    }
    static async create(data) {
        const item = this.repo.create(data);
        return this.repo.save(item);
    }
    static async update(id, data) {
        const item = await this.repo.findOneBy({ id });
        if (!item)
            return null;
        this.repo.merge(item, data);
        return this.repo.save(item);
    }
    static async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected === 1;
    }
}
exports.MenuItemService = MenuItemService;
MenuItemService.repo = data_source_1.AppDataSource.getRepository(menu_entity_1.MenuEntity);
//# sourceMappingURL=menu.service.js.map