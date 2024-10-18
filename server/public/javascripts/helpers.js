function getImageLink(input) {
  const regex = /(?:<img src=(?:"|')https:\/\/)(.*?)(?:"|')/g;
  const extractedImageTags = [...input.matchAll(regex)];
  const storedLinks = [];
  
  extractedImageTags.map((link) => {
    const temp = link[1].split('/');
    const imgRef = (temp[temp.length - 1]).split('.');
    storedLinks.push(imgRef[0]);
    }  
  )
  return storedLinks;
}

module.exports = {
  getImageLink
}