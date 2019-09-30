<script context="module">
  export async function preload() {
    const theme = await this.fetch('theme.json').then(d => d.json())

    function reduce(obj) {
      return Object.entries(obj).reduce((acc, [name, value]) => {
        if (typeof value === 'string') {
          return { ...acc, [name]: value }
        } else {
          return {
            ...acc,
            ...Object.entries(value).reduce((acc2, [subname, subvalue]) => {
              return { ...acc2, [`${name} • ${subname}`]: subvalue }
            }, {}),
          }
        }
      }, {})
    }

    return {
      colors: reduce(theme.colors),
      spacing: reduce(theme.spacing),
      boxShadow: reduce(theme.boxShadow),
    }
  }
</script>

<script>
  import Heading from '../components/Heading.svelte'

  export let colors
  export let spacing
  export let boxShadow
</script>

<style>
  .wrapper {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
  .swatch {
    @apply rounded;
    @apply border;
    @apply ml-4;
    width: 32px;
    height: 32px;
  }
</style>

<div class="wrapper">
  <div>
    <section class="bg-white rounded px-4 pb-4 pt-4">
      <Heading>colors</Heading>
      <table>
        <tbody>
          {#each Object.entries(colors) as [key, value]}
            <tr>
              <th class="text-indigo-600 text-xs uppercase text-right pr-4">
                {key}
              </th>
              <td>{value}</td>
              <td>
                <div class="swatch" style={`background-color:${value};`} />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  </div>

  <div>
    <section class="bg-white rounded px-4 pb-4 pt-4">
      <Heading>spacing</Heading>
      <table>
        <tbody>
          {#each Object.entries(spacing) as [key, value]}
            <tr>
              <th class="text-indigo-600 text-xs uppercase text-right pr-4">
                {key}
              </th>
              <td>{value}</td>
              <td>
                <div class="swatch" style={`width:${value};height:${value};`} />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  </div>

  <div>
    <section class="bg-white rounded px-4 pb-4 pt-4">
      <Heading>boxShadow</Heading>
      <table>
        <tbody>
          {#each Object.entries(boxShadow) as [key, value]}
            <tr>
              <th class="text-indigo-600 text-xs uppercase text-right pr-4">
                {key}
              </th>
              <td>{value}</td>
              <td>
                <div class="swatch" style={`box-shadow:${value};`} />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  </div>
</div>
