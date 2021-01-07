
var id = getCookie("id");
console.log(id);
db.collection("blogs").where("userid", "==", id)
    .onSnapshot(function(querySnapshot) {
        console.log(querySnapshot)
    }, function (err) {
        console.log(err.message)
    });
auth.onAuthStateChanged(function(user){
    if (user) {
        db.collection('users').doc(user.uid).get().then(function (doc) {
            console.log(doc);
            document.getElementById('FLname').innerHTML = doc.data().Fname + " " + doc.data().Lname
            document.getElementById('ttle').innerHTML = doc.data().track;
            if (getCookie("Role") == "admin"){
                var li = document.createElement('li');
                var a = document.createElement('a');
                var text = document.createTextNode('Manage Users');
                li.append(a);
                a.append(text);
                a.setAttribute('href', 'adminpanel.html');
                document.getElementById('navbar').append(li)
            }
            db.collection("blogs").where("userid", "==", user.uid).orderBy('created_at','desc')
                .onSnapshot(function(querySnapshot) {
                    setupPosts(querySnapshot);

                }, function (err) {
                    console.log(err.message)
                });

        })
    } else {
        setupPosts([]);
    }
});


var postForm = document.querySelector('#createPost');
postForm.addEventListener('submit', function(e){
    e.preventDefault();
    // get post info
    //var title = postForm['title'].value;
    var body = postForm['body'].value;
    db.collection('blogs').add({
        body: body,
        title: "test",
        userid: auth.currentUser.uid,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
        console.log("Done");
        postForm.reset();
        location.reload(true)
    }).catch(function (error) {
        var errorMessage = error.message;
        console.log(errorMessage)
    })
});



const postsList = document.querySelector('#posts');
// setup guides
var setupPosts = function(data){
    let html = '';
    data.forEach(doc => {

        var post = doc.data();
        var time = doc.data().created_at;
        var date = time.toDate();
        var shortDate = date.toDateString();
        var shortTime = date.toLocaleTimeString();
        const li =
            `<div class="post line-div">
                    <div class="head">
                    <div class="img"><img src="img/profile.jpg"></div>
                    <div class="info">
                    <div class="name">${getCookie("Fname")} ${getCookie("Lname")}</div>
                <div class="time">${shortTime}</div>
                    </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="body">
                    <p>${post.body}</p>
                <div><a href="">Read more..</a></div>
                </div>
                </div>`
        html += li;
    });
    postsList.innerHTML = html
};

