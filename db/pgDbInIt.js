const pool= require('./connectdb')

const initDb= async ()=>{
    try{
        await pool.query(`
            CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name varchar(100) not null,
            email varchar(100) not null unique CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
            password text not null,
            role user_role DEFAULT 'user'
        );`
    );
    }catch(e){
        console.log(e);
    }
    console.log("Created users table")
};

module.exports={initDb}
