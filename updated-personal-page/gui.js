// Configuration options
const config = {
    // Background settings
    backgroundType: 'gradient', // 'gradient', 'bing', 'custom'
    useBingWallpaper: false,    // Whether to use Bing daily wallpaper
    customBackgroundUrl: './abstract.webp',    // Custom background URL

    // Background gradient colors
    bgColorStart: '#6e8efb',
    bgColorEnd: '#a777e3',

    // Card content background
    cardBgOpacity: 0.2,
    cardBlur: 10,

    // Name highlight colors
    nameColorStart: '#ffdd00',
    nameColorEnd: '#ff5722',

    // Avatar border
    avatarBorderColor: 'rgba(255, 255, 255, 0.5)',

    // Control panel settings
    showPanel: true
};

// Update CSS variables and styles
function updateStyles() {
    // Get card element
    const card = document.querySelector('.card');

    // Set background based on type
    if (config.backgroundType === 'gradient') {
        // Gradient background
        document.documentElement.style.setProperty('--color-primary', config.bgColorStart);
        document.documentElement.style.setProperty('--color-secondary', config.bgColorEnd);
        card.style.backgroundImage = `linear-gradient(135deg, ${config.bgColorStart}, ${config.bgColorEnd})`;

        // Clear any existing background image
        card.style.backgroundSize = '';
        card.style.backgroundPosition = '';
        card.style.backgroundColor = '';
    }
    else if (config.backgroundType === 'bing') {
        // Use Bing daily wallpaper
        setBingWallpaperAsBackground(card, (wallpaper) => {
            console.log('Loaded Bing wallpaper:', wallpaper.url);

            // Update copyright style
            const copyright = document.getElementById('bing-copyright');
            if (copyright) {
                copyright.style.position = 'absolute';
                copyright.style.bottom = '5px';
                copyright.style.right = '10px';
                copyright.style.fontSize = '10px';
                copyright.style.color = 'rgba(255, 255, 255, 0.6)';
                copyright.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.5)';
                copyright.style.zIndex = '10';
            }
        });
    }
    else if (config.backgroundType === 'custom' && config.customBackgroundUrl) {
        // Custom background image
        card.style.backgroundImage = `url(${config.customBackgroundUrl})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
    }

    // Update card background
    const cardContent = document.querySelector('.card-content');
    cardContent.style.backgroundColor = `rgba(255, 255, 255, ${config.cardBgOpacity})`;
    cardContent.style.backdropFilter = `blur(${config.cardBlur}px)`;
    cardContent.style.webkitBackdropFilter = `blur(${config.cardBlur}px)`;

    // Update name highlight
    const highlightName = document.querySelector('.highlight-name');
    if (highlightName) {
        // Update gradient background
        highlightName.style.backgroundImage = `linear-gradient(to right, ${config.nameColorStart}, ${config.nameColorEnd})`;
        highlightName.style.webkitBackgroundClip = 'text';
        highlightName.style.mozBackgroundClip = 'text';
        highlightName.style.backgroundClip = 'text';

        // For browsers supporting transparent text
        highlightName.style.color = 'transparent';
        highlightName.style.webkitTextFillColor = 'transparent';
    }

    // Update avatar border
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.style.borderColor = config.avatarBorderColor;
    }
}

// Initialize GUI
function initGUI() {
    const gui = new lil.GUI({ title: 'Website Color Control Panel' });
    gui.close(); // Collapsed by default

    // Background type selection
    const bgTypeOptions = {
        'Gradient': 'gradient',
        'Bing Daily': 'bing',
        'Custom Image': 'custom'
    };

    gui.add(config, 'backgroundType', bgTypeOptions)
        .name('Background Type')
        .onChange(value => {
            config.backgroundType = value;
            updateStyles();
        });

    // Background gradient settings
    const bgFolder = gui.addFolder('Background Gradient');
    bgFolder.addColor(config, 'bgColorStart').name('Start Color').onChange(updateStyles);
    bgFolder.addColor(config, 'bgColorEnd').name('End Color').onChange(updateStyles);

    // Custom background settings
    const customBgFolder = gui.addFolder('Custom Background');
    customBgFolder.add(config, 'customBackgroundUrl').name('Image URL')
        .onFinishChange(value => {
            config.customBackgroundUrl = value;
            if (config.backgroundType === 'custom') {
                updateStyles();
            }
        });

    // Refresh Bing wallpaper button
    gui.add({
        refreshBingWallpaper: function () {
            if (config.backgroundType !== 'bing') {
                config.backgroundType = 'bing';
            }
            updateStyles();
        }
    }, 'refreshBingWallpaper').name('Refresh Bing Wallpaper');

    // Card content settings
    const cardFolder = gui.addFolder('Frosted Glass Effect');
    cardFolder.add(config, 'cardBgOpacity', 0, 1, 0.01).name('Background Opacity').onChange(updateStyles);
    cardFolder.add(config, 'cardBlur', 0, 20, 0.5).name('Blur Amount').onChange(updateStyles);

    // Name highlight settings
    const nameFolder = gui.addFolder('Name Highlight');
    nameFolder.addColor(config, 'nameColorStart').name('Start Color').onChange(updateStyles);
    nameFolder.addColor(config, 'nameColorEnd').name('End Color').onChange(updateStyles);

    // Avatar border settings
    const avatarFolder = gui.addFolder('Avatar Settings');
    avatarFolder.addColor(config, 'avatarBorderColor').name('Border Color').onChange(updateStyles);

    // Add save config button
    gui.add({
        saveConfig: function () {
            localStorage.setItem('websiteConfig', JSON.stringify(config));
            alert('Configuration saved!');
        }
    }, 'saveConfig').name('Save Current Config');

    // Add reset button
    gui.add({
        resetConfig: function () {
            localStorage.removeItem('websiteConfig');
            location.reload();
        }
    }, 'resetConfig').name('Reset to Default');

    // Control panel visibility
    gui.add(config, 'showPanel').name('Show Control Panel')
        .onChange(value => {
            gui.domElement.style.display = value ? 'block' : 'none';
            localStorage.setItem('showPanel', value);
        });

    // Check if panel was previously hidden
    const savedShowPanel = localStorage.getItem('showPanel');
    if (savedShowPanel === 'false') {
        config.showPanel = false;
        gui.domElement.style.display = 'none';
    }

    return gui;
}

// Load saved configuration
function loadSavedConfig() {
    const savedConfig = localStorage.getItem('websiteConfig');
    if (savedConfig) {
        try {
            const parsedConfig = JSON.parse(savedConfig);
            Object.assign(config, parsedConfig);
        } catch (e) {
            console.error('Failed to load saved configuration:', e);
        }
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadSavedConfig();
    updateStyles();
    initGUI();
});