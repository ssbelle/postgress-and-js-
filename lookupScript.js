const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


///////first solution////////
// client.connect(error => {
//   if (error) throw error;
//   var someId = process.argv[2];

//   client.query(`select * from famous_people where first_name = $1;`, [someId] , (error, results) => {
//     if (error) throw error;

//     // display all results received ///not async cb
//     results.rows.forEach(row => {
//       for (column in row) {
//         console.log(column, row[column]);
//       }
//     });

//     console.log("Or grab one field",results.rows[1]);
//     console.log("Done with that.");

//     client.end(error => {
//       if (error) throw error;
//     });
//   });
// });




//////refactor number 1//////
var someId = process.argv[2];

client.connect (error => {
  if (error) throw error;
  query()
});

function query () {
  client.query(`select * from famous_people WHERE first_name = $1;`, [someId], (error, results) => {
    if (error) throw error;

    // display all results received
    results.rows.forEach(row => {
      for (column in row) {
        console.log(column, row[column]);
      }
    });
    //console.log("Or grab one field",results.rows[0]);
    client.end(error => {
      if (error) throw error;
    });
  });
}



///////refactor 2 -- remove for each ////Does not work yet///
// var someId = process.argv[2];

// client.connect (error => {
//   if (error) throw error;
//   query()
// });


// function query () {
//   client.query(`select * from famous_people WHERE first_name = $1;`, [someId], (error, results) => {
//     if (error) throw error;



//     //console.log("Or grab one field",results.rows[0]);
//     client.end(error => {
//       if (error) throw error;
//     });
//   });
// }


// // display all results received
// // function each (error, results) => {
// //     if (error) throw error;
// //     var each =

//     results.rows.forEach(row => {
//       for (column in row) {
//         console.log(column, row[column]);
//       }
//     });

