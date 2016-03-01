import Photo from './../models/photo';

const initialState = { photos: [] };

export default function photos(state = initialState, action) {
  switch (action.type) {
  case 'GET_PHOTOS':
    return Photo
      .query(function (qb) {
        qb.limit(100).offset(0).orderBy('created_at', 'desc');
      })
      .fetchAll({ withRelated: ['versions', 'tags'] })
      .then((data) => {
        return { photos: data.photos.toJSON() };
      });

  default:
    return state;
  }
}
