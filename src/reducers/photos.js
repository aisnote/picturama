import updatePhotos from './../lib/update-photos';

const initialState = {
  diff: false,
  current: -1,
  importing: false,
  splashed: true,
  currentDate: null,
  currentTag: null,
  showOnlyFlagged: false,
  photos: []
};

function photos (state = initialState, action) {
  //console.log('photo initial state', state);
  switch (action.type) {
  case 'GET_PHOTOS_SUCCESS':
    return {
      ...state,
      diff: false,
      current: -1,
      importing: false,
      splashed: true,
      currentDate: action.hasOwnProperty('date') ? action.date : state.currentDate,
      currentTag: action.hasOwnProperty('tagId') ? action.tagId : state.currentTag,
      showOnlyFlagged: action.hasOwnProperty('showOnlyFlagged') ? action.showOnlyFlagged : state.showOnlyFlagged,
      photos: action.photos.map((photo) => {
        photo.versionNumber = 1;

        if (photo.hasOwnProperty('versions') && photo.versions.length > 0) {
          photo.versionNumber = 1 + photo.versions.length;

          let lastVersion = photo.versions[photo.versions.length - 1];

          photo.thumb = lastVersion.output;
          photo.thumb_250 = lastVersion.thumbnail;
        }

        return photo;
      })
    };

  case 'UPDATED_PHOTO_SUCCESS':
    return {
      ...state,
      photos: updatePhotos(state.photos, action.photo)
    };

  default:
    return state;
  }
}

export default photos;