const users = [
    {
        id:1,
        user: "JJuanjo28",
        email: "comodinesperfumados@gmail.com",
        password: "123456",
        tasks: [
            {id:1, type:"important",task:"Hacer la tarea",completed:true},
            {id:2, type:"normal",task:"Comprar papas",completed:false},
            {id:3, type:"important",task:"Hacer esta App",completed:false},
        ]
    },
    {
        id:2,
        user: "CarlitosPro",
        email: "carlitospro@gmail.com",
        password: "123456",
        tasks: [
            {id:1, type:"important",task:"Estudiar",completed:false},
            {id:2, type:"normal",task:"Comprar carne",completed:true},
            {id:3, type:"important",task:"verificar esta App",completed:false},
        ]
    },
    {
        id:3,
        user: "Nachulito",
        email: "nachulito@gmail.com",
        password: "123456",
        tasks: [
            {id:1, type:"important",task:"mirar la tele",completed:false},
            {id:2, type:"normal",task:"joder a carlos",completed:false},
            {id:3, type:"important",task:"leer un manga",completed:true},
        ]
    },

]

export default users