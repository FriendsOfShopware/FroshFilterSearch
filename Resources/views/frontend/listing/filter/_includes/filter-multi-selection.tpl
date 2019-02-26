{extends file="parent:frontend/listing/filter/_includes/filter-multi-selection.tpl"}

{block name="frontend_listing_filter_facet_multi_selection_title"}
    {$smarty.block.parent}
    <div class='filter-panel--search'>
        <input type="text" 
            class="frosh-filter-search" 
            data-frosh-filter-search="true" 
            data-froshOptionListSizeTrigger={$optionListSizeTrigger} 
            placeholder="{s namespace='frontend/plugins/filter_search' name='filterSearchPlaceholder'}Suchen ...{/s}"
            disabled="disabled"
        />
    </div>
{/block}