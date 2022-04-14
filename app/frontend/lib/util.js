export const getPostTime = (t) => {
  const postTime = new Date(t);
  const postTimeFormat = `${postTime.getFullYear()}年${postTime.getMonth() + 1}月${postTime.getDate()}日`;
  const differencePostTimeFromNow = (new Date().getTime()) - postTime.getTime();
  const minute = 1000 * 60;
  const hour = 1000 * 60 * 60;
  const day = 1000 * 60 * 60 * 24;

  if((differencePostTimeFromNow / minute) < 60) {
    return `${Math.floor(differencePostTimeFromNow / minute)}分前`
  } else if((differencePostTimeFromNow / hour) < 24) {
    return `${Math.floor(differencePostTimeFromNow / hour)}時間前`
  }　else if((differencePostTimeFromNow / day) < 10) {
    return `${Math.floor(differencePostTimeFromNow / day)}日前`
  } else {
    return postTimeFormat
  }
}

export const omittedText = (s) => {
  const maxLength = 200;
  return s.length > maxLength ? s.substr(0,maxLength) + '...' : s;
}