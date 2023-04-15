import { Component, OnInit } from '@angular/core';

const OPTIONS = [
  { value: '', label: 'Selecione uma opção' },
  { value: '1', label: 'Jeans' },
  { value: '2', label: 'Camisa' },
  { value: '3', label: 'Camiseta' },
  { value: '4', label: 'Calça' },
  { value: '5', label: 'Bermuda' },
  { value: '6', label: 'Moleton' },
  { value: '7', label: 'Roupa de cama' },
  { value: '8', label: 'Panos' },
  { value: '9', label: 'Roupa íntima' },
  { value: '10', label: 'Meias' },
  { value: '11', label: 'Sapato' },
];

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public options: any;

  constructor() {
    this.options = OPTIONS;
  }

  ngOnInit() {
    $(document).ready(function () {
      $(document).on('click', '.close', function () {
        $(this).parent().hide();
      });

      $('#add_row').on('click', function () {
        // Dynamic Rows Code

        // Get max row id and set new id
        var newid = 0;
        $.each($('#tab_logic tr'), function () {
          if (parseInt($(this).data('id')) > newid) {
            newid = parseInt($(this).data('id'));
          }
        });
        newid++;

        var tr = $('<tr></tr>', {
          id: 'addr' + newid,
          'data-id': newid,
        });

        // loop through each td and create new elements with name of newid
        $.each($('#tab_logic tbody tr:nth(0) td'), function () {
          var td;
          var cur_td = $(this);

          var children = cur_td.children();

          // add new td and element if it has a nane
          if ($(this).data('name') !== undefined) {
            td = $('<td></td>', {
              'data-name': $(cur_td).data('name'),
            });

            var c = $(cur_td).find($(children[0]).prop('tagName')).clone().val('');
            c.attr('name', $(cur_td).data('name') + newid);
            c.appendTo($(td));
            td.appendTo($(tr));
          } else {
            td = $('<td></td>', {
              text: $('#tab_logic tr').length,
            }).appendTo($(tr));
          }
        });

        // add the new row
        $(tr).appendTo($('#tab_logic'));

        $(tr)
          .find('td button.row-remove')
          .on('click', function () {
            $(this).closest('tr').remove();
          });
      });

      // Sortable Code
      var fixHelperModified = function (e, tr) {
        var $originals = tr.children();
        var $helper = tr.clone();

        $helper.children().each(function (index) {
          $(this).width($originals.eq(index).width());
        });

        return $helper;
      };

      $('.table-sortable tbody')
        .sortable({
          helper: fixHelperModified,
        })
        .disableSelection();

      $('.table-sortable thead').disableSelection();

      $('#add_row').trigger('click');
    });
  }

  public handleAlert() {
    alert('Orçamento rejeitado!');
  }

  public handleAlert2() {
    alert('Orçamento aceito!');
  }
}
