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
  loadGrowls(authResult);
  $('#btn-logout').show();
});

$(document).ready(function() {

  $('#btn-login').on('click', function(e) {
    e.preventDefault();
    lock.show();
  });

  $('#btn-logout').on('click', function(e) {
    console.log('out');
    e.preventDefault();
    logout();
  });

  $('#new-growl').on('submit', function(e) {
    e.preventDefault();
    newGrowl();
  })

  if (isLoggedIn())
    loadGrowls();
  }
);

function logout() {
  localStorage.removeItem('idToken');
  window.location.href = '/';
};

function isLoggedIn() {
  var token = localStorage.getItem('idToken');
  if (token) {
    $('#btn-logout').show();
    return true
  } else {
    return false
  }
};

function loadGrowls(authResult) {
  $('#growls').empty();
  $('#btn-login').hide();
  $('#loggedin').show();

  $.ajax({
    url: 'https://stormy-oasis-48596.herokuapp.com/growls',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('idToken')
    }
  }).done(function(data) {
    data.forEach(function(datum) {
      loadGrowl(datum, authResult);
    })
  })
};

function loadGrowl(growl, authResult) {
  var li = $('<li />');
  user = authResult.idTokenPayload.email.split('@')[0];
  li.html(growl.growl + '<br>' + '-' + user);
  li.data('id', growl._id);
  $('#growls').append(li);
}

function newGrowl() {
  growl = $('#growl-text').val();
  if (growl.length <= 141) {
    $.ajax({
      method: 'POST',
      url: 'https://stormy-oasis-48596.herokuapp.com/growls',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('idToken')
      },
      data: {
        growl: growl
      }
    }).done(function(data) {
      loadGrowls();
      $('#growl-text').val("");
    })
  } else {
    alert('Please use 141 characters or less');
  }
};
