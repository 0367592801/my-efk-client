import strapi from './strapi';
import { getCurrentUserFromLocalCookie } from './auth';

export const uploadBit = (bit) => {
  return new Promise((resolve, reject) => {
    if (!process.browser || !bit) {
      reject();
    }
    const form = new FormData();
    form.append('files', bit);
    strapi.upload(form)
      .then(files => {
        const userId = JSON.parse(getCurrentUserFromLocalCookie()).id;
        strapi.createEntry('bits', { source: files[0], user: userId })
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

export const isBitCodeExisted = (bitCode) => {
  return new Promise((resolve, reject) => {
    if (!process.browser || !bitCode || bitCode === '') {
      reject();
    }
    strapi.getEntries('bits', { code: bitCode })
      .then(bits => {
        if (bits.length === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const updateBit = (bitId, bitData) => {
  return new Promise((resolve, reject) => {
    if (!process.browser || !bitId) {
      reject();
    }
    strapi.updateEntry('bits', bitId, bitData)
      .then(res => {
        if (res) {
          resolve(res);
        }
      })
      .catch(err => {
        reject(err);
      })
  });
}