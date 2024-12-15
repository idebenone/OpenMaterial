import sequelize from "../config/pgConnection";
import { User } from "./userModel";
import { Token } from "./tokenModel";
import { Session } from "./sessionModel";

User.hasMany(Token, { sourceKey: "id", foreignKey: "user_id", as: "tokens" });
Token.belongsTo(User, { targetKey: "id", foreignKey: "user_id", as: "user" });

User.hasOne(Session, { sourceKey: "id", foreignKey: "user_id", as: "session" });
Session.belongsTo(User, { targetKey: "id", foreignKey: "user_id", as: "user" });

export { sequelize, User, Token, Session };
