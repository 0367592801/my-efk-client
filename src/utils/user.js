import strapi from './strapi';
import { getCurrentUserFromLocalCookie } from './auth';

export const uploadAvatar = (userId, avatar) => {
  return new Promise((resolve, reject) => {
    if (!process.browser || !userId || !avatar) {
      reject();
    }
    const form = new FormData();
    form.append('files', avatar);
    strapi.upload(form)
      .then(files => {
        strapi.createEntry('userprofiles', { avatar: files[0], userId })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err)
          });
      })
      .catch(err => {
        reject(err);
      })
  });
};

export const getCurrentUserAvatar = () => {
  const user = JSON.parse(getCurrentUserFromLocalCookie());
  if (!user) {
    // reject(new Error('Cannot find current user'));
  }
  return new Promise((resolve, reject) => {
    if (!process.browser) {
      reject();
    }
    strapi.getEntries('userprofiles', { userId: user.id })
      .then(profiles => {
        if (!profiles || profiles.length === 0) reject();
        resolve(profiles[0].avatar);
      })
      .catch(err => {
        reject(err);
      })
  });
}