<?php
import('lib.pkp.classes.plugins.BlockPlugin');

class TwitterBlockPlugin extends BlockPlugin
{

    public function getDisplayName()
    {
        return __('plugins.blocks.twitter.title');
    }


    public function getDescription()
    {
        return __('plugins.blocks.twitter.desc');
    }

    public function getContents($templateMgr, $request = null)
    {
        $contextId = Application::getRequest()->getContext()->getId();
        $templateMgr->assign('tweetTitle', $this->getSetting($contextId, 'tweetTitle'));
        $templateMgr->assign('tweetUrl', $this->getSetting($contextId, 'tweetUrl'));
        $templateMgr->assign('tweetColor', $this->getSetting($contextId, 'tweetColor'));
        $templateMgr->assign('tweetHeight', $this->getSetting($contextId, 'tweetHeight'));
        $templateMgr->assign('tweetOptions', $this->getSetting($contextId, 'tweetOptions'));
        $templateMgr->assign('tweetDataLimit', $this->getSetting($contextId, 'tweetDataLimit'));
        return parent::getContents($templateMgr, $request);
    }

    public function getActions($request, $actionArgs)
    {
        $actions = parent::getActions($request, $actionArgs);
        if (!$this->getEnabled()) {
            return $actions;
        }
        $router = $request->getRouter();
        import('lib.pkp.classes.linkAction.request.AjaxModal');
        $linkAction = new LinkAction(
            'settings',
            new AjaxModal(
                $router->url(
                    $request,
                    null,
                    null,
                    'manage',
                    null,
                    array(
                        'verb' => 'settings',
                        'plugin' => $this->getName(),
                        'category' => 'blocks'
                    )
                ),
                $this->getDisplayName()
            ),
            __('manager.plugins.settings'),
            null
        );
        array_unshift($actions, $linkAction);
        return $actions;
    }

    public function manage($args, $request)
    {
        switch ($request->getUserVar('verb')) {
            case 'settings':
                $this->import('TwitterBlockPluginSettingsForm');
                $form = new TwitterBlockPluginSettingsForm($this);
                if (!$request->getUserVar('save')) {
                    $form->initData();
                    return new JSONMessage(true, $form->fetch($request));
                }
                $form->readInputData();
                if ($form->validate()) {
                    $form->execute();
                    return new JSONMessage(true);
                }
        }
        return parent::manage($args, $request);
    }
}