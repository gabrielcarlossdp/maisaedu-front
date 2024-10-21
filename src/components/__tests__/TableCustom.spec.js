import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TableCustom from '../TableCustom.vue'

describe('TableCustom', () => {
  it('renders properly', () => {
    const wrapper = mount(TableCustom, {
      props: {
        headers: [
          { text: 'Name', key: 'name' },
          { text: 'Age', key: 'age' },
        ],
        itens: [
          { name: 'John Doe', age: 25 },
          { name: 'Jane Doe', age: 30 },
        ],
      },
    })

    expect(wrapper.find('thead th:nth-child(1)').text()).toBe('Name')
    expect(wrapper.find('thead th:nth-child(2)').text()).toBe('Age')
    expect(wrapper.findAll('tbody tr').length).toBe(2)
    expect(wrapper.find('tbody tr:nth-child(1) td:nth-child(1)').text()).toBe(
      'John Doe',
    )
    expect(wrapper.find('tbody tr:nth-child(1) td:nth-child(2)').text()).toBe(
      '25',
    )
    expect(wrapper.find('tbody tr:nth-child(2) td:nth-child(1)').text()).toBe(
      'Jane Doe',
    )
    expect(wrapper.find('tbody tr:nth-child(2) td:nth-child(2)').text()).toBe(
      '30',
    )
  })

  it('renders actions column when actions prop is true', () => {
    const wrapper = mount(TableCustom, {
      props: {
        headers: [
          { text: 'Name', key: 'name' },
          { text: 'Age', key: 'age' },
        ],
        itens: [
          { name: 'John Doe', age: 25 },
          { name: 'Jane Doe', age: 30 },
        ],
        actions: true,
      },
    })

    expect(wrapper.find('thead th:nth-child(3)').text()).toBe('Ações')
    expect(wrapper.findAll('tbody tr').length).toBe(2)
    expect(wrapper.find('tbody tr:nth-child(1) td:nth-child(3)').text()).toBe(
      '',
    )
    expect(wrapper.find('tbody tr:nth-child(2) td:nth-child(3)').text()).toBe(
      '',
    )
  })

  it('renders actions column with custom content when actions prop is an array', () => {
    const wrapper = mount(TableCustom, {
      props: {
        headers: [
          { text: 'Name', key: 'name' },
          { text: 'Age', key: 'age' },
        ],
        itens: [
          { name: 'John Doe', age: 25 },
          { name: 'Jane Doe', age: 30 },
        ],
        actions: [
          { text: 'Edit', icon: 'mdi-pencil' },
          { text: 'Delete', icon: 'mdi-trash-can' },
        ],
      },
      slots: {
        actions: `<template #actions="{ row }">
                  <v-btn icon="mdi-pencil" @click="() => console.log('Edit', row)"></v-btn>
                  <v-btn icon="mdi-trash-can" @click="() => console.log('Delete', row)"></v-btn>
              </template>`,
      },
    })

    expect(wrapper.find('thead th:nth-child(3)').text()).toBe('Ações')
    expect(wrapper.findAll('tbody tr').length).toBe(2)
    expect(
      wrapper.find('tbody tr:nth-child(1) td:nth-child(3)').html(),
    ).toContain('mdi-pencil')
    expect(
      wrapper.find('tbody tr:nth-child(1) td:nth-child(3)').html(),
    ).toContain('mdi-trash-can')
    expect(
      wrapper.find('tbody tr:nth-child(2) td:nth-child(3)').html(),
    ).toContain('mdi-pencil')
    expect(
      wrapper.find('tbody tr:nth-child(2) td:nth-child(3)').html(),
    ).toContain('mdi-trash-can')
  })
})
