$(function() {
  var ref = new Firebase("https://comment-jekyll-csstricks.firebaseio.com/"),
    postRef = ref.child(slugify(window.location.pathname));

    postRef.on("child_added", function(snapshot) {
      var newPost = snapshot.val();
      $(".comments").prepend('<div class="comment">' +
        '<h4>' + newPost.name + '</h4>' +
        '<div class="profile-image"><img src="http://www.gravatar.com/avatar/' + newPost.md5Email + '?s=100&d=retro"/></div> ' +
        '<span class="date">' + moment(newPost.postedAt).fromNow() + '</span><p>' + newPost.message  + '</p></div>');
    });

    $("#comment").submit(function() {
      postRef.push().set({
        name: $("#name").val(),
        message: $("#message").val(),
        md5Email: md5($("#email").val()),
        postedAt: Firebase.ServerValue.TIMESTAMP
      });

      $("input[type=text], textarea").val("");
      return false;
    });
});

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-');
}
