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
      fontSize: reduce(theme.fontSize),
      fontWeight: reduce(theme.fontWeight),
    }
  }
</script>

<script>
  import Heading from '../components/Heading.svelte'

  export let colors
  export let spacing
  export let boxShadow
  export let fontSize
  export let fontWeight
</script>

<style>
  .triple {
    column-count: 3;
  }
  .double {
    column-count: 2;
  }
  .item {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr min-content 1fr;
  }
  .item + .item {
    @apply mt-2;
  }
  .swatch {
    @apply rounded;
    @apply border;
    width: 32px;
    height: 32px;
  }
</style>

<section class="bg-white rounded px-4 pb-4 pt-4 mb-8">
  <Heading>colors</Heading>
  <ul class="triple">
    {#each Object.entries(colors) as [key, value]}
      <li class="item">
        <p class="text-indigo-600 text-xs uppercase text-right">{key}</p>
        <div class="swatch" style={`background-color:${value};`} />
        <p>{value}</p>
      </li>
    {/each}
  </ul>
</section>
<section class="bg-white rounded px-4 pb-4 pt-4 mb-8">
  <Heading>spacing</Heading>
  <ul class="triple">
    {#each Object.entries(spacing) as [key, value]}
      <li class="item">
        <p class="text-indigo-600 text-xs uppercase text-right">{key}</p>
        <div class="swatch" style={`height:${value};`} />
        <p>{value}</p>
      </li>
    {/each}
  </ul>
</section>
<section class="bg-white rounded px-4 pb-4 pt-4 mb-8">
  <Heading>boxShadow</Heading>
  <ul class="triple">
    {#each Object.entries(boxShadow) as [key, value]}
      <li class="item">
        <p class="text-indigo-600 text-xs uppercase text-right">{key}</p>
        <div class="swatch" style={`box-shadow:${value};`} />
        <p>{value}</p>
      </li>
    {/each}
  </ul>
</section>
<section class="bg-white rounded px-4 pb-4 pt-4 mb-8">
  <Heading>fontSize</Heading>
  <ul class="double">
    {#each Object.entries(fontSize) as [key, value]}
      <li class="item">
        <p class="text-indigo-600 text-xs uppercase text-right">{key}</p>
        <p style={`font-size:${value};`}>Somnambulist</p>
        <p>{value}</p>
      </li>
    {/each}
  </ul>
</section>
<section class="bg-white rounded px-4 pb-4 pt-4 mb-8">
  <Heading>fontWeight</Heading>
  <ul class="double">
    {#each Object.entries(fontWeight) as [key, value]}
      <li class="item">
        <p class="text-indigo-600 text-xs uppercase text-right">{key}</p>
        <p style={`font-weight:${value};`}>Somnambulist</p>
        <p>{value}</p>
      </li>
    {/each}
  </ul>
</section>
