$(document).ready(function(){
    var indexCounter = 1;

    var baseFontSize = parseInt($(document.body).css('font-size'), 10);

    $('#addBox').click(function(){ createContextBox(); });

    $('.inputTitle').focus(function(){ $(this).select(); });
    $('.inputSize').focus(function(){ $(this).select(); });
    $('.inputTarget').focus(function(){ $(this).select(); });

    $('.inputTarget, .inputSize, .contextType').on('keyup change', function(){
        var $this = $(this);
        var id = $this.attr('id').split('_')[1];

        changed(id);
    });

    $('.buttonDelete').click(function(){
        var $this = $(this);
        var id = $this.attr('id').split('_')[1];
        if (!$('#contextBox_' + id).hasClass('originalBox')) {
            $('#contextBox_' + id).remove();
        }
    });

    $('.outputTarget').focus(function(){ $(this).select(); });

    function createContextBox() {
        var newBox = $('.originalBox').clone(true);
        newBox.removeClass('originalBox');
        newBox.attr('id', 'contextBox_' + indexCounter)

        $('.inputTitle', newBox).val('Context Name');

        $('.buttonDelete', newBox).attr('id', 'buttonDelete_' + indexCounter);

        $('.contextType', newBox).attr('id', 'contextType_' + indexCounter);

        $('.inputSize', newBox).attr('id', 'inputSize_' + indexCounter);
        $('.inputSize', newBox).attr('disabled', false);
        $('.inputSize', newBox).val('0');

        $('.inputTarget', newBox).attr('id', 'inputTarget_' + indexCounter);
        $('.inputTarget', newBox).val('0');

        $('.outputTarget', newBox).attr('id', 'outputTarget_' + indexCounter);
        $('.outputTarget', newBox).attr('disabled', true);
        $('.outputTarget', newBox).val('0');

        $('.targetFormat', newBox).html('%');
        $('.targetFormat', newBox).attr('id', 'targetFormat_' + indexCounter);

        newBox.prependTo($('#boxesContainer'));

        indexCounter++;
    }

    function changed(id) {
        var $contextBox = $('#contextBox_' + id);
        var contextType = $('#contextType_' + id).val();
        var contextSize = $('#inputSize_' + id).val();
        var targetSize = $('#inputTarget_' + id).val();

        var result = 0;

        if (contextType == 'layer') {
            result = (targetSize / contextSize) * 100;
            $('#targetFormat_' + id).html('%');
            $('#inputSize_' + id).attr('disabled', false);
        } else if (contextType == 'text') {
            result = targetSize / baseFontSize;
            $('#targetFormat_' + id).html('em');
            $('#inputSize_' + id).attr('disabled', true);
        }

        if (!isNaN(result) && isFinite(result)) {
            $('#outputTarget_' + id).val(result);
            $('#outputTarget_' + id).attr('disabled', false);
        } else {
            $('#outputTarget_' + id).val(0);
            $('#outputTarget_' + id).attr('disabled', true);
        }
    }
});