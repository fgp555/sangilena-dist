"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRestaurant = seedRestaurant;
const data_source_1 = require("../../config/data-source");
const restaurant_entity_1 = require("../../module/restaurant/entities/restaurant.entity");
const tables_sede1_json_1 = __importDefault(require("./data/tables/tables-sede1.json"));
const users_sede1_json_1 = __importDefault(require("./data/users/users-sede1.json"));
const users_sede2_json_1 = __importDefault(require("./data/users/users-sede2.json"));
const al_carbon_json_1 = __importDefault(require("./data/categories/al-carbon.json"));
const cervezas_json_1 = __importDefault(require("./data/categories/cervezas.json"));
const de_la_tierrita_json_1 = __importDefault(require("./data/categories/de-la-tierrita.json"));
const la_pesca_json_1 = __importDefault(require("./data/categories/la-pesca.json"));
const las_burgers_y_mas_json_1 = __importDefault(require("./data/categories/las-burgers-y-mas.json"));
const los_premium_json_1 = __importDefault(require("./data/categories/los-premium.json"));
const menu_infantil_json_1 = __importDefault(require("./data/categories/menu-infantil.json"));
const pa_acompanar_json_1 = __importDefault(require("./data/categories/pa-acompanar.json"));
const pa_que_jarte_json_1 = __importDefault(require("./data/categories/pa-que-jarte.json"));
const para_arrancar_json_1 = __importDefault(require("./data/categories/para-arrancar.json"));
const pinchos_json_1 = __importDefault(require("./data/categories/pinchos.json"));
const platos_de_la_casa_json_1 = __importDefault(require("./data/categories/platos-de-la-casa.json"));
const pura_brasa_json_1 = __importDefault(require("./data/categories/pura-brasa.json"));
const pura_lena_json_1 = __importDefault(require("./data/categories/pura-lena.json"));
async function seedRestaurant() {
    const repo = data_source_1.AppDataSource.getRepository(restaurant_entity_1.RestaurantEntity);
    const existing = await repo.findOne({ where: {} });
    if (existing)
        return;
    const categories = [
        para_arrancar_json_1.default,
        de_la_tierrita_json_1.default,
        pura_lena_json_1.default,
        platos_de_la_casa_json_1.default,
        al_carbon_json_1.default,
        pinchos_json_1.default,
        los_premium_json_1.default,
        menu_infantil_json_1.default,
        las_burgers_y_mas_json_1.default,
        pura_brasa_json_1.default,
        la_pesca_json_1.default,
        pa_acompanar_json_1.default,
        pa_que_jarte_json_1.default,
        cervezas_json_1.default,
    ];
    const googleMapUrl = "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d15839.803508778188!2d-73.057293!3d7.01506!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMDAnNTQuMiJOIDczwrAwMycyNi4zIlc!5e0!3m2!1sen!2sus!4v1751072330402!5m2!1sen!2sus";
    const data = [
        {
            location: "📍La Españolita Km7 via Florida/Piedecuesta",
            slug: "la-espanolita",
            whatsapp: "3112113571",
            instagram: "https://instagram.com/sangilenacampestre",
            googleMapUrl,
            photos: [],
            categories,
            users: [...users_sede1_json_1.default],
            tables: [...tables_sede1_json_1.default],
        },
        {
            location: "📍Main Location San Gil – Road to Barichara",
            slug: "san-gil",
            whatsapp: "3101234567",
            instagram: "https://instagram.com/sangilenacampestre",
            googleMapUrl,
            photos: [],
            categories,
            users: [...users_sede2_json_1.default],
            tables: [...tables_sede1_json_1.default],
        },
    ];
    const records = data.map((entry) => repo.create(entry));
    await repo.save(records);
    console.log("✅ Restaurantes sembrados con usuarios demo");
}
//# sourceMappingURL=seedRestaurant.js.map