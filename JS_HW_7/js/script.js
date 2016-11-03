'use strict';

$(function () {

    var questionArr = [
        {
            testTitle: '���� �� ����������������'
        },
        {
            questionTitle: '1. �������� ���������� ����� ��� �������������� ������� � JSON ������:',
            answerList: ['render()',
                'parse()',
                'stringify()',
                'toJSON()'],
            inputName: 'question-1'
        },
        {
            questionTitle: '2. ����� ������ �������� ������ �������� ������������?',
            answerList: ['JSON',
                'XML',
                'TXT',
                'SQL'],
            inputName: 'question-2'
        },
        {
            questionTitle: '3. �������� ���������� ������� ��������� XML �����:',
            answerList: ['<greeting Hello, world!>',
                '<greeting>Hello, world!</greeting>',
                '<greeting>Hello, world!</>'],
            inputName: 'question-3'
        }
    ];

    localStorage.setItem( 'questionStr', JSON.stringify(questionArr) );

    var questionList = localStorage.getItem('questionStr');

    questionList = JSON.parse(questionList);

    /**    ������� ������ ��� �������� �������     **/
    var correctAnswer = ['stringify()', 'JSON', '<greeting>Hello, world!</greeting>'];
    var checkCorrectAnswer = [];

    var $content = _.template( $('#template').html() );
    var $body = $('body');
    var $modal;
    var $overlay;
    var $closeX;
    var $closeButton;
    var $checkAnswerButton;

    $body.append( $content( {list: questionList} ));

    $checkAnswerButton = $('.form__check-answer');


    function showModal(e) {
        e.preventDefault();

        /**   �������� ��� ���������� ������  **/
        var $userAnswerCollect = $("input:radio:checked").parent('label');


        /**    ��������� �� � ������    **/
        $userAnswerCollect.map(function() {
            return checkCorrectAnswer.push($(this).text());
        })

        /**    ��������� ���������� ������ � �������� � ������ ���������, ������� ���������� � DOM   **/
        var testResult = function () {
            if ( JSON.stringify(correctAnswer)==JSON.stringify(checkCorrectAnswer) ) {
                return "���� �������";
            } else {
                return "���� ��������";
            }
        };

        $overlay = $('<div class="modal-overlay"></div>');
        $modal = $('<div class="modal">'+
            '<button type="button" class="closeX">&times;</button>'+
            '<p class="modal__message">' + testResult() + '</p>'+
            '<button type="button" class="close-button">Close</button>'+
            '</div>');

        $body.append($overlay);
        $body.append($modal);

        $closeX = $('.closeX');
        $closeButton = $('.close-button');

        $modal.fadeIn(1000);

        $overlay.one('click', hideModal);
        $closeX.one('click', hideModal);
        $closeButton.one('click', hideModal);
    }

    function hideModal() {
        $modal.remove();
        $overlay.remove();
        $('input:radio').prop('checked', false);
        checkCorrectAnswer = [];
    }

    $checkAnswerButton.on('click', showModal);

});