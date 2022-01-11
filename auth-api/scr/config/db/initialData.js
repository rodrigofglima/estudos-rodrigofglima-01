import bcrypt from "bcrypt";
import User from "../../modules/user/model/User.js"

export async function createInicialData() {

try {
    await User.sync({ force: true});

    let password = await bcrypt.hash('123456', 10);

    await User.create({
        name: 'User test',
        email: 'usuario1@gmail.com',
        password: password,
    });

    await User.create({
        name: 'Maria',
        email: 'maria1354@gmail.com',
        password: password,
    });
} catch (error) {
    console.log(error);
}
}