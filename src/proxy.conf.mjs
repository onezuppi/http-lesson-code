export default {
    "/civitai-api": {
        "target": "https://civitai.com/api/v1/",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
            "^/civitai-api": ""
        },
        "bypass": function (req, res, proxyOptions) {
              const apiKey = process.env.CIVIT_API;

              req.headers['Authorization'] = `Bearer ${apiKey}`;
        }
    },
    "/sd-api": {
        "target": "http://127.0.0.1:7860/sdapi/v1/",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
            "^/sd-api": ""
        },
    },
}
