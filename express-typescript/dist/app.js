"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const app = express_1.default();
app.use(express_1.default.json());
app.use('/todos', todos_1.default);
app.use((err, req, res, next) => {
    res.json({ message: err.message, status: '404' });
});
app.listen(6000, () => {
    console.log('Server running on port 6000');
});
