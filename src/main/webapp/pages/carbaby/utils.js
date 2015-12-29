/**
 * jiangyukun on 2015/12/29.
 */
define("utils", [], function () {
    return {
        getImageShape: function (ImageShape, CircleShape, x, y, rX, rY, imgUrl, zlevel) {
            if (typeof rY === 'string') {
                zlevel = imgUrl;
                imgUrl = rY;
                rY = rX;
            }
            return new ImageShape({
                zlevel: zlevel || 0,
                style: {
                    x: x - rX,
                    y: y - rY,
                    width: 2 * rX,
                    height: 2 * rY,
                    image: imgUrl
                },
                clipShape: new CircleShape({
                    style: {
                        x: x,
                        y: y,
                        r: (rX + rY) / 2
                    }
                })
            });
        }
    };
});
