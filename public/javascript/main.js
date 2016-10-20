$.ajaxSetup({
  headers: {
  'Authorization': 'Bearer '+localStorage.getItem('idToken')
}});

$(document).ready(function() {
  var lock = new Auth0Lock('KBoDe6JHtErBVYwfDyubAIku3OlJvMe9', 'nathanjensby.auth0.com', {
    auth: {
      params: {
        scope: 'openid email'
      }
    }
  });

  lock.on('authenticated', function(authResult) {
    console.log('authResult:', authResult);
    localStorage.setItem('idToken', authResult.idToken);
    loadGrowls();
  });

  $('#btn-login').on('click', function(e) {
    e.preventDefault();
    lock.show();
  });

  $('#btn-logout').on('click', function(e) {
    console.log('out');
    e.preventDefault();
    logout();

  if (isLoggedIn()) loadGrowls();
  });
});

function logout() {
  localStorage.removeItem('idToken');
  window.location.href = '/';
};

function isLoggedIn() {
  var token = localStorage.getItem('idToken');
  if (token) {
    return true
  } else {
    return false
  }
};

function loadGrowls() {
  $('#growls').empty();
  $('#btn-login').hide();
  $('#loggedin').show();

  $.ajax({
    url: 'http://localhost:3000/growls'
  }).done(function(data) {
    data.forEach(function(datum) {
      loadGrowl(datum);
    })
  })
};

function loadGrowl(growl) {
  var li = $('<li />');
  li.text(growl.growl);
  li.data('id', growl._id);
  $('#growls').append(li);
}

function newStudent() {
  growl = $('#growl-text').val();

  $.ajax({method: 'POST', url: 'http://127.0.0.1:3000/growls',
  data: {
    growl: growl
  }}).done(function(data) {
    loadGrowls();
  })
};
