
var User = require('./user.model');
var sanitizer = require('sanitizer');
var nark = require('./../../config').nark;
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
var shortId = require('shortid');
var fs = require('fs');
var _ = require('lodash');
// var passport = require('passport');

Promise.promisifyAll(bcrypt);

/**
 * Get list of users
 * restriction: 'admin'
 */
// jshint ignore:start
exports.index = async function(req, res) {
  try {
    let users = await User.query();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error al cargar');
  }
};
// jshint ignore:end

exports.login = function (req, res) {
  console.log(req.body)
  req.session.name = req.body.name;
  res.send(req.session.name)
}


exports.update = function  (req,res) {

  User.findById(req.user.id)
    .then(function  (u) {

      // Evitar que alguien se ponga permisos de administrador
      if (req.body.type === 'admin') {
        req.body.type = 'usuario';
      }

      var data = {
        name:sanitizer.sanitize( req.body.name ),
        surname:sanitizer.sanitize( req.body.surname ),
        email:sanitizer.sanitize( req.body.email ),
        details:sanitizer.sanitize( req.body.details ),
        phone:req.body.phone,
        website:req.body.website,
        type:req.body.type
      };

      return u.updateAttributes(data);

    })
    .then(function  () {
      console.log(req.user.name,' actualizó su perfil');
      res.send('Perfil actualizado');
    })
    .catch(function  (err) {
      console.trace(err);
      res.status(500).send('Error al actualizar tus datos');
    });
};
/**
 * Get a single user
 */
exports.show = function (req, res, next) {

  User.findOne({
    where:{ id:req.params.id },
    raw:true,
    attributes:['id','picture','name','surname','email','facebook','type','details','website','address','lastLogin']
  })
    .then(function (profile) {

      console.log(`Cargando perfil de usuario de ${profile.name}`);

      return Necesidad.findAll({
          where:{
            userId:profile.id
          },
          raw:true
        }).then(function (necesidades) {
          profile.necesidades = necesidades;
          console.log(`Necesidades ${necesidades.length}`);
          return profile;
        });

    })
    .then(function (profile) {

      return Comentario.findAll({
          where:{
            userId:profile.id
          },
          raw:true
        }).then(function (data) {
          profile.comentarios = data;
          console.log(`Comentarios ${data.length}`);
          return profile;
        });

    })
    .then(function (profile) {
      res.json(profile);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar perfil de usuario');
    });
};


exports.upload = function (req,res) {



  User.findById(req.user.id)
    .then(function (user) {
      console.log(req.user.name,' está cambiando su foto de perfil'.blue);
      req.pipe(req.busboy);
      req.busboy.on('file', function (fieldname, file, filename,encoding, mimetype) {
        console.log('Peparandose para subir archivo');
        console.log(mimetype);
        if (mimetype==='image/png'||mimetype==='image/jpeg'||mimetype==='application/pdf') {
          var name = shortId.generate() + '_' + filename;
          name = _.deburr(name); // quitar acentos y símbolos raros
          name = _.snakeCase(name); // reemplazar espacios por _
          var path = 'public/users/' + name;

          var fstream = fs.createWriteStream(path);
          file.pipe(fstream);
          fstream.on('close', function () {
            console.log('Subiendo archivo');
            user.picture = `/users/${name}`;

            user.save()
              .then(function (data) {
                res.send(user.picture);
              })
              .catch(function (err) {
                console.error(err);
                res.status(500).send('Error al guardar la imagen');
              });
            // una vez subido el archivo procedemos  a crearle un thumbnail
            // var lenna = new Jimp(path, function (err, image) {
            //   if (err) {
            //     return console.error(err);
            //   }
            //
            //   // this.resize(350,Jimp.AUTO) // resize
            //   //     .crop(0, 0, 150, 150) // crop
            //   //     .write(pathThumb); // guardar thumbnail
            //
            //
            // });
          });

          fstream.on('error', function (err) {
            console.log('Error al subir el archivo'.red);
            console.log(err);
            res.status(500).send('Error al subir el archivo');
          });
        }else{
          res.status(500).send('Formato de archivo no válido');
        }

      });

    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar la imagen');
    });

};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  // var userId = req.user._id;
  // var oldPass = String(req.body.oldPassword);
  // var newPass = String(req.body.newPassword);
  //
  // User.findById(userId, function (err, user) {
  //   if(user.authenticate(oldPass)) {
  //     user.password = newPass;
  //     user.save(function(err) {
  //       if (err) return validationError(res, err);
  //       res.send(200);
  //     });
  //   } else {
  //     res.send(403);
  //   }
  // });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {

  // var profile = {
  //   id:req.user.id,
  //   name : req.user.name,
  //   surname : req.user.surname,
  //   email: req.user.email
  // };

  User.findOne({
    where:{ id:req.user.id },
    attributes:['id','name','surname','email','picture','facebook','type','details','website','address','lastLogin']
  })
    .then(function (profile) {
      profile.lastLogin = new Date();
      res.json(profile);
      return profile.save();
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar perfil de usuario');
    });
};

exports.password = function (req,res) {

  bcrypt.genSaltAsync(10)
    .then(function (salt) {
      return bcrypt.hashAsync(req.params.password,salt);
    })
    .then(function (data) {
      res.send(data);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });


  bcrypt.genSalt(10, function(err, salt) {
    if(err)res.status(500).send(err);

    res.json(salt);
  });

};

exports.subscribe = function (req,res) {
  console.log(`${req.user.email} se suscribió a `.blue);
  console.log(req.body);
  res.send('Suscrito correctamente')
}
