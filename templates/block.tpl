<div class="pkp_block block_twitter">
    <span class="title">{$tweetTitle|unescape:"html"}</span>
    <div class="content" style="max-height: {$tweetHeight}px; overflow-y: auto;">
        <a class="twitter-timeline" data-height="{$tweetHeight}" data-link-color="{$tweetColor}"
           href="{$tweetUrl}"
           data-chrome="{$tweetOptions}"
           data-tweet-limit="3"></a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
</div>