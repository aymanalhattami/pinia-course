import { defineStore, acceptHMRUpdate }  from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "@/stores/AuthUserStore";

export const useCartStore = defineStore('CartStore', {
    state: () => {
        return {
            items: []
        };
    },

    actions: {
        addItem(count, product){
            count = parseInt(count);

            for(let index = 0; index < count; index++){
                this.items.push(product);
            }
        },

        clearItem(itemName){
            this.items = this.items.filter(item => item.name !== itemName);
        },

        setItemCount(item, count){
            this.clearItem(item.name);
            this.addItem(count, item);
        },

        checkout(){
            const authUserStore = useAuthUserStore();
            alert(authUserStore.username + ' just bought items at total $' + this.total);
        }
    },

    getters: {
        count: state => state.items.length,
        isEmpty: state => state.count === 0,
        grouped: state => {
            const grouped = groupBy(state.items, item => item.name)
            const sorted = Object.keys(grouped).sort();
            let inOrder = {};
            sorted.forEach(key => inOrder[key] = grouped[key])

            return inOrder;
        },
        groupCount: state => name => state.grouped[name].length,
        total: state => state.items.reduce((p, c) => p + c.price, 0)
    }
});

if (import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
