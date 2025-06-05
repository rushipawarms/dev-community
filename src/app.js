const express = require("express");
const app = express();

// app.use('/home', (req, res) => {
//   res.send("Dashboard page");
// });

// app.use('/profile', (req, res) => {
//   res.send("profile page");
// });

// app.use('/', (req, res) => {
//   res.send("login page");
// }); //here '/' place at end so , we changed order 

// Correct route handling
app.get('/', (req, res) => {
  res.send("login page");
});

app.get('/home', (req, res) => {
  res.send("Dashboard page");
});

app.get('/profile', (req, res) => {
  res.send("profile page");
});

app.post('/update-profile', (req, res) => {
  res.send("profile updated");
});

app.delete('/delete-photo', (req, res) => {
  res.send("deleted");
});

app.get('/test', (req, res) => {
  res.send("test successfull")
})

// working in version 4
// app.get("ab?cd", (req, res) => {
//   res.send('optional test','acd or abcd');
// });

// b is optional here
app.get(/^\/ab?cd$/, (req, res) => {
  res.send('optional test', 'acd or abcd');
});

// you add anything between xy and z but xy z must be there
app.get('/xy{*splat}z', (req, res) => {
  res.send('test xy***z',);
});

// here you can add ass many v you want
app.get(/uv+wx/, (req, res) => {
  res.send('test xv***vwz',);
});

// here mn is optional
app.get(/l(mn)?o/, (req, res) => {
  res.send('test lo',);
});

// now we use regex which contain specific string at end
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})

//regex to match URL path that contains rushi anywhere
app.get(/.*rushi.*/, (req, res) => {
  res.send('/.*rushi.*/')
})

//dunamic route reading
app.get('/user/:userId', (req, res) => {
  res.send(req.params.userId);
});

//query param
app.get('/user', (req, res) => {
  const { name, id } = req.query
  res.send(`${name},${id}`);
});

//route handler explaination
app.get('/test1',

  [(req, res, next) => {
    console.log("first handler")
    res.send("first handler")
    //res.send("first handler")
    next()
  },
  (req, res, next) => {
    console.log("2nd handler")
    //gettting error , send 2nd responce  in same route
    res.send("2nd handler")
    //next()
  },
  [(req, res, next) => {
    console.log("3rd handler")
    //gettting error , send 2nd responce  in same route
    //next()
    res.send("3rd handler")
  }],
  (req, res, next) => {
    console.log("4th handler")
    //gettting error , send 2nd responce  in same route
    res.send("4th handler")
    //next()
  }]
)

app.get('/test2', (req, res, next) => {
  console.log("1st route")
  //res.send("1st route")
  next()
})

app.get('/test2', (req, res, next) => {
  console.log("2nd route")
  res.send("2nd route")
  //next()
})
//middlerware concept
// app.get('/admin/getData',(req,res,next)=>{
//   const token= 'xyz';
//   const isAdmin = token==='xyz1';
//   if(isAdmin){
//     res.send("user data send")
//   }
//   else{
//     res.status(401).send("Unauthorized request")
//   }
// })

// app.get('/admin/deleteData',(req,res,next)=>{
//   const token= 'xyz';
//   const isAdmin = token==='xyz';
//   if(isAdmin){
//     res.send("delete data")
//   }
//   else{
//     res.status(401).send("Unauthorized request")
//   }
// })

//but here is route middlerware we used
// app.use('/admin', (req, res, next) => {
//   const token = 'xyz';
//   const isAdmin = token === 'xyz';
//   if (isAdmin) {
//     next()
//   }
//   else {
//     res.status(401).send("Unauthorized request")
//   }
// })

// rigth way to organize code
const {adminAuth} = require('./middlewares/auth')

app.use('/admin',adminAuth)

app.get('/admin/getData', (req, res) => {
  res.send("user data send")
})
app.get('/admin/deleteData', (req, res) => {
  res.send("delete data")
})


app.listen(3000, () => {
  console.log("listening on 3000");
});
