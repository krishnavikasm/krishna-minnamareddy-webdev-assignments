var key = "8fea3135a9dea02bf494b127599c1f4b";
var secret = "d27c428d19717826";
var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

function searchPhotos(searchTerm) {
    var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
    return $http.get(url);
}

var FlickrService = {
  searchPhotos
};
