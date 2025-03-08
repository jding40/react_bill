

  [视频](https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=79&vd_source=3e05d299234d3693083101ba5ffee81c) 

```js
const addBillList = (newBill) => {
  return async (dispatch) => {
    //编写异步请求
    const res = await axios.post("http://localhost:8888/ka", newBill);
    //触发同步reducer
    dispatch(addBill(res.data));
  };
};
```