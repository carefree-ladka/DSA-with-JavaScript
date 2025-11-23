class MasonryLayout {
    constructor() {
        this.items = [];
        this.nextId = 1;
        this.init();
    }

    init() {
        this.generateInitialItems();
        this.render();
    }

    generateInitialItems() {
        const sampleItems = [
            { title: 'Beautiful Sunset', description: 'A stunning view of the sunset over the mountains with vibrant colors painting the sky.', tags: ['nature', 'sunset', 'mountains'], size: 'medium' },
            { title: 'City Lights', description: 'Urban nightscape with glowing lights.', tags: ['city', 'night'], size: 'small' },
            { title: 'Ocean Waves', description: 'Peaceful ocean waves crashing against the shore on a calm evening. The sound of water creates a meditative atmosphere.', tags: ['ocean', 'waves', 'peaceful'], size: 'large' },
            { title: 'Forest Path', description: 'A winding path through a dense forest.', tags: ['forest', 'path'], size: 'medium' },
            { title: 'Mountain Peak', description: 'Snow-capped mountain peak reaching towards the clouds. The majestic view inspires adventure and exploration of nature\'s wonders.', tags: ['mountain', 'snow', 'peak'], size: 'extra-large' },
            { title: 'Desert Dunes', description: 'Golden sand dunes stretching endlessly.', tags: ['desert', 'sand'], size: 'small' },
            { title: 'Starry Night', description: 'Countless stars illuminating the dark sky above a quiet landscape.', tags: ['stars', 'night', 'sky'], size: 'large' },
            { title: 'Waterfall', description: 'Cascading waterfall in tropical paradise.', tags: ['waterfall', 'tropical'], size: 'medium' }
        ];

        this.items = sampleItems.map((item, index) => ({
            id: index + 1,
            ...item
        }));
        this.nextId = this.items.length + 1;
    }

    addItem() {
        const sizes = ['small', 'medium', 'large', 'extra-large'];
        const titles = ['New Adventure', 'Scenic View', 'Natural Wonder', 'Urban Explorer', 'Peaceful Moment'];
        const descriptions = [
            'A new discovery waiting to be explored.',
            'Another beautiful moment captured in time.',
            'Nature\'s artwork displayed in perfect harmony.',
            'The beauty of simplicity in everyday life.',
            'A journey through colors and emotions.'
        ];
        const tagOptions = ['adventure', 'scenic', 'nature', 'urban', 'peaceful', 'colorful', 'journey', 'moment'];

        const newItem = {
            id: this.nextId++,
            title: titles[Math.floor(Math.random() * titles.length)],
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            tags: this.getRandomTags(tagOptions, 2),
            size: sizes[Math.floor(Math.random() * sizes.length)]
        };

        this.items.push(newItem);
        this.render();
    }

    getRandomTags(tagOptions, count) {
        const shuffled = [...tagOptions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    shuffle() {
        this.items = this.items.sort(() => Math.random() - 0.5);
        this.render();
    }

    reset() {
        this.items = [];
        this.nextId = 1;
        this.generateInitialItems();
        this.render();
    }

    render() {
        const container = document.getElementById('masonryContainer');
        container.innerHTML = this.items.map(item => this.createItemHTML(item)).join('');
    }

    createItemHTML(item) {
        const randomHeight = Math.floor(Math.random() * 200) + 150;
        
        return `
            <div class="masonry-item item-${item.size}">
                <div class="item-image" style="height: ${randomHeight}px;"></div>
                <div class="item-content">
                    <h3 class="item-title">${item.title}</h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize masonry layout
const masonry = new MasonryLayout();