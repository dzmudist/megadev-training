<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { causeOf, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  // The three problems inside one ticket. The one-day shifts are counted apart from the cause their tenant gives them.
  const all = uniqueById(reports as Report[]);
  const oneDay = all.filter((r) => notes.oneDayMove.includes(r.id));
  const rest = all.filter((r) => !notes.oneDayMove.includes(r.id));
  const parser = rest.filter((r) => causeOf(r, tenantOf(r)) === 'parser').length;
  const hint = rest.filter((r) => causeOf(r, tenantOf(r)) === 'hint').length;
</script>

<table>
  <thead><tr><th>problem</th><th>reports</th></tr></thead>
  <tbody>
    <tr><td>parser reads dates month first</td><td>{parser}</td></tr>
    <tr><td>booking-v3 hint says MM/DD/YYYY</td><td>{hint}</td></tr>
    <tr><td>one-day shift</td><td>{oneDay.length}</td></tr>
    <tr><td><b>total</b></td><td><b>{all.length}</b></td></tr>
  </tbody>
</table>
