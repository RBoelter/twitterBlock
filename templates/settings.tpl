<script>
    $(function () {ldelim}
        $('#twitterSettings').pkpHandler('$.pkp.controllers.form.AjaxFormHandler');
        {rdelim});
</script>

<form
        class="pkp_form"
        id="twitterSettings"
        method="POST"
        action="{url router=$smarty.const.ROUTE_COMPONENT op="manage" category="blocks" plugin=$pluginName verb="settings" save=true}"
>
    <!-- Always add the csrf token to secure your form -->
    {csrf}

    {fbvFormArea}
    {fbvFormSection}
    {fbvElement type="text" id="tweetTitle" value=$tweetTitle label="plugins.blocks.twitter.tweet.title"}
    {fbvElement type="text" id="tweetUrl" value=$tweetUrl label="plugins.blocks.twitter.tweet.url"}
    {fbvElement type="text" id="tweetColor" value=$tweetColor label="plugins.blocks.twitter.tweet.color"}
    {fbvElement type="text" id="tweetHeight" value=$tweetHeight label="plugins.blocks.twitter.tweet.height"}
    {fbvElement type="text" id="tweetOptions" value=$tweetOptions label="plugins.blocks.twitter.tweet.options"}
    {/fbvFormSection}
    {/fbvFormArea}
    {fbvFormButtons submitText="common.save"}
</form>