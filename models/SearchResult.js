class SearchResult {
    constructor(
        publishedAt, 
        channelId, 
        title, 
        description,
        channelTitle,
        publishTime
    ) {

        this.publishedAt = publishedAt;
        this.channelId = channelId; 
        this.title =  title;
        this.description = description;
        this.channelTitle = channelTitle;
        this.publishTime = publishTime;
    }
}

module.exports = SearchResult