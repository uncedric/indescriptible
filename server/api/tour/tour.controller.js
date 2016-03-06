var Tour   = require('./model');
var fs        = require('fs');
var colors    = require('colors');
var config    = require('./../../config/config.json');
var shortId   = require('shortid');
var _ = require('lodash');
var unzip = require('unzip');
var config = require('./../../config/config.json');
var exec = require( 'child_process' ).exec;


exports.index = function(req, res) {
  Tour.findAll()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar los tours');
    });
};

// para crear un tour primero se debe de subir e ZIP con los archivos generados por el programa
exports.create = function (req, res) {

      console.log('Creando nuevo tour'.blue);
      req.pipe(req.busboy);
      req.busboy.on('file', function (fieldname, file, filename,encoding, mimetype) {
        console.log('Peparandose para subir archivo');
        console.log(mimetype);
        if (mimetype==='application/zip'||mimetype==='application/octet-stream') {
          var name = shortId.generate() + '_' + filename;
          // name = _.deburr(name); // quitar acentos y símbolos raros
          name = _.snakeCase(name); // reemplazar espacios por _
          var path = 'zips/' + name;

          var fstream = fs.createWriteStream(path);
          file.pipe(fstream);
          fstream.on('close', function () {
            console.log('Archivo subido correctamente');

            // ya que se subió el ZIP procedemos a extraerlo y publicarlo

            Tour.create({
                nombre:'Nuevo tour'
              })
              .then(function (tour) {

                fs.createReadStream(path)
                  .pipe(unzip.Extract({ path: 'public/tours/' + tour.id }));
                tour.path = 'tours/' + tour.id;
                tour.titulo = 'Nuevo tour';
                return tour.save();
              })
              .then(function (tour) {
                console.log('Ruta del tour actualizada');
                console.log(`El ID del tour creado es ${tour.id}`);
                res.send(String(tour.id));
              })
              .catch(function (err) {
                console.error(err)
                res.status(500).send('Error al guardar el tour en la Base de Datos');
              });
          });

          fstream.on('error', function (err) {
            console.log('Error al subir el archivo'.red);
            console.log(err);
            res.status(500).send('Error al subir el archivo');
          });

        }else{
          console.error('Formato no válido');
          res.status(500).send('Formato de archivo no válido');
        }

      });


};

exports.imagen = function (req, res) {

  console.log('Subiendo imagen'.blue);
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename,encoding, mimetype) {
    console.log('Peparandose para subir archivo');
    console.log(mimetype);
    if (mimetype==='image/png'||mimetype==='image/jpeg') {
      var name = shortId.generate() + '_' + filename;
      // name = _.deburr(name); // quitar acentos y símbolos raros
      // name = _.snakeCase(name); // reemplazar espacios por _
      var path = 'public/thumbs/' + name;

      var fstream = fs.createWriteStream(path);
      file.pipe(fstream);
      fstream.on('close', function () {
        console.log('Archivo subido correctamente');


        Tour.findById(req.params.id)
          .then(function (tour) {

            tour.imagen = `thumbs/${name}`;
            return tour.save();
          })
          .then(function (tour) {
            console.log('imagen del tour actualizada');
            res.send(tour.imagen);
          })
          .catch(function (err) {
            console.error(err)
            res.status(500).send('Error al guardar el tour en la Base de Datos');
          });
      });

      fstream.on('error', function (err) {
        console.log('Error al subir el archivo'.red);
        console.log(err);
        res.status(500).send('Error al subir el archivo');
      });

    }else{
      console.error('Formato no válido');
      res.status(500).send('Formato de archivo no válido');
    }

  });



};


exports.show = function (req, res) {

  // var Xray = require('x-ray');
  // var xray = Xray();
  //
  // xray('http://www.cimabr.com/es/casa-en-venta-en-cuernavaca-colonia-san-anton/d197.html', 'title')(function(err, title) {
  //   console.log(title) // Google
  // })

  Tour.findById(req.params.id,{raw:true})
    .then(function (data) {
      data.enlace = `<a href="${config.domain}tour/${data.id}" style="padding:30px;margin:20px;background-color:#9e4322;display:inline-block;text-decoration:none;border-radius: 10px;color:#ffffff;font-size:20px">Tour Virtual</a>`;
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar el tour');
    });
};


exports.update = function (req, res) {
  console.log('Actualizando info del tour ' + req.params.id);
  Tour.findById(req.params.id)
    .then(function (data) {

      data.codigo = req.body.codigo;
      data.titulo = req.body.titulo;
      data.descripcion = req.body.descripcion;
      data.url = req.body.url;
      data.imagen = req.body.imagen;

      return data.save();
    })
    .then(data => {
      res.send('Tour actualizado')
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al actualizar el tour');
    });

};

exports.delete = function(req, res) {

  console.log('Eliminando tour'.yellow);
  Tour.destroy({
      where:{
        id:req.params.id
      }
    })
    .then(function () {
      exec( 'rm -r public/tours/' + req.params.id, function ( err, stdout, stderr ){
        if (err) {
          console.error(err)
        } else if(stderr) {
          console.error(stderr)
        } else {
          console.log('Carpeta del tour eliminada :)')
        }
      });
      res.send('Tour eliminado');
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al eliminar el tour');
    });
};
