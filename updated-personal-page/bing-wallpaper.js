/**
 * Bing每日壁纸加载器
 */

// 跨域代理URL
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const BING_URL = 'https://www.bing.com';
const BING_API = '/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';

// 获取Bing每日壁纸
async function getBingWallpaper() {
    try {
        // 尝试直接获取，如果有跨域问题，则使用代理
        const apiUrl = `${CORS_PROXY}${encodeURIComponent(BING_URL + BING_API)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.images && data.images.length > 0) {
            // 完整的壁纸URL
            const wallpaperUrl = BING_URL + data.images[0].url;
            // 壁纸版权信息
            const copyright = data.images[0].copyright;

            return {
                url: wallpaperUrl,
                copyright: copyright
            };
        } else {
            throw new Error('无法获取Bing壁纸数据');
        }
    } catch (error) {
        console.error('获取Bing壁纸出错:', error);
        // 返回备用壁纸
        return {
            url: 'https://www.bing.com/th?id=OHR.HalloweenCuteAI_ZH-CN1079713117_1920x1080.jpg',
            copyright: 'Bing每日壁纸 (加载失败，使用备用图片)'
        };
    }
}

// 设置壁纸为背景
function setBingWallpaperAsBackground(element, onSuccess) {
    getBingWallpaper().then(wallpaper => {
        // 添加版权信息元素
        let copyrightElement = document.getElementById('bing-copyright');
        if (!copyrightElement) {
            copyrightElement = document.createElement('div');
            copyrightElement.id = 'bing-copyright';
            document.body.appendChild(copyrightElement);
        }

        // 更新版权信息
        copyrightElement.textContent = wallpaper.copyright;

        // 设置背景图片
        element.style.backgroundImage = `url(${wallpaper.url})`;
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';

        // 回调函数
        if (typeof onSuccess === 'function') {
            onSuccess(wallpaper);
        }
    });
}

// 导出函数
window.setBingWallpaperAsBackground = setBingWallpaperAsBackground; 