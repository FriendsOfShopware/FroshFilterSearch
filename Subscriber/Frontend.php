<?php

namespace FroshFilterSearch\Subscriber;

use Enlight\Event\SubscriberInterface;
use Shopware\Components\Plugin\ConfigReader;

class Frontend implements SubscriberInterface
{
    /**
     * @var array
     */
    private $configReader;

    /**
     * @param ConfigReader $configReader
     * @param string $pluginName
     */
    public function __construct(ConfigReader $configReader)
    {
        $this->configReader = $configReader;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            'Enlight_Controller_Action_PostDispatchSecure_Frontend_Listing' => 'onFrontendListing',
            'Enlight_Controller_Action_PostDispatchSecure_Frontend_Search' => 'onFrontendListing',
        ];
    }

    /**
     * @param \Enlight_Event_EventArgs $args
     */
    public function onFrontendListing(\Enlight_Event_EventArgs $args)
    {
        $controller = $args->getSubject();
        $view = $controller->View();

        $config = $this->configReader->getByPluginName('FroshFilterSearch');

        if(isset($config['optionListSizeTrigger'])) {
            $view->assign('optionListSizeTrigger', $config['optionListSizeTrigger']);
        }
    }
}