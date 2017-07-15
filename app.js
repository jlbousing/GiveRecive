//API RESTFULL

var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    pg = require("pg"),
    app = express(); 


//STRING DE CONEXIÓN A LA BASE DE DATOS
var connect  = "postgres://Jorge:root@localhost/GiveRecive";

app.engine("dust", cons.dust);

app.set("view engine", "dust");
app.set("views", __dirname + "/views"); 

app.use(express.static(__dirname + "/public")); //MIDDLEWARE PARA SERVIR ARCHIVOS ESTÁTICOS

 //BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get("/",function(req,res){
    
    res.render("inicio");
});

app.get("/repositorio", function(req,res){
   
    
    
    //CONEXIÓN CON LA BASE DE DATOS
    pg.connect(connect,function(err,client,done){
        if(err){
            return console.error("error fetching client from pool",err);
        }
        client.query("SELECT * FROM donacion",function(err,result){
    
            if(err){
                return console.error("error running query",err);
            }
            
            console.log("SE CONECTO!!!");
            console.log(result.rows);
            res.render("repositorio",{donacion: result.rows});
            done();
        });
    });
});

app.get("/donacion",function(req,res){
    
    res.render("donar");
});

app.get("/solicitud",function(req,res){
    res.render("necesidad");
});

app.get("/reposolicitud",function(req,res){
    
    pg.connect(connect,function(err,client,done){
        if(err){
            return console.error("error fetching client from pool",err);
        }
        client.query("SELECT * FROM solicitud",function(err,result){
    
            if(err){
                return console.error("error running query",err);
            }
            
            console.log("ENTRO AL REPO DE SOLICITUD!!!");
            console.log(result.rows.nombre);
            res.render("reposolicitud",{solicitud: result.rows});
            done();
        });
    });
    
});

app.get("/buscar",function(req,res){
    
    res.render("buscar");
    
});

app.post("/buscar",function(req,res){
    
    pg.connect(connect,function(err,client,done){
        if(err){
            return console.error("error fetching client from pool",err);
        }
        client.query("SELECT * FROM donacion WHERE nombre = $1",[req.body.NombreProducto],function(err,result){
    
            if(err){
                return console.error("error running query",err);
            }
            
            console.log("BUSQUEDA POR NOMBRE!!!");
            console.log(result.rows.nombre);
            res.render("buscar",{donacion: result.rows});
            done();
        });
    });
    
});

app.post("/pedir",function(req,res){
    
    pg.connect(connect,function(err,client,done){
        
        if(err){
            console.log(err);
        }
        
        client.query("INSERT INTO solicitud(nombre,descripcion,ciudad) VALUES($1,$2,$3)",[req.body.NombreProducto,req.body.descripcion,req.body.Ciudad]);
        
        console.log("SE HA INSERTADO UNA SOLICITUD EN LA BASE DE DATOS");
    });
});

app.post("/donar",function(req,res){
    
    pg.connect(connect,function(err,client,done){
       
        if(err){
            console.log(err);
        }
        
        client.query("INSERT INTO donacion(nombre,descripcion,ubicacion) VALUES($1,$2,$3)",[req.body.NombreProducto,req.body.Descripcion,req.body.ciudad]);
        
        console.log("SE HA INSERTADO UNA DONACION EN LA BASE DE DATOS");
    });
});

app.post("/log",function(req,res){
    
    
    //CONEXIÓN CON LA BASE DE DATOS
    pg.connect(connect,function(err,client,done){
        if(err){
            return console.error("error fetching client from pool",err);
        }
        client.query("SELECT * FROM donacion",function(err,result){
    
            if(err){
                return console.error("error running query",err);
            }
            
            console.log("SE CONECTO!!!");
            console.log(result.rows.nombre);
            res.render("repositorio",{donacion: result.rows});
            done();
        });
    });
    
});

//SERVER
app.listen(3000,function(){
    console.log("server is running on port 3000");
});
