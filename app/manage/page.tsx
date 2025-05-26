"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Users, 
  Edit, 
  Trash2, 
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { 
  Form, 
  FormControl,
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data for demonstration
const mockReservation = {
  id: "res123",
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "(555) 123-4567",
  guestCount: 2,
  dietaryRestrictions: "Vegetarian",
  specialRequests: "Prefer seating near dance floor",
  status: "confirmed"
};

const searchFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  confirmationCode: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const editFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  guestCount: z.number().min(0).max(2),
  dietaryRestrictions: z.string().optional(),
  specialRequests: z.string().optional(),
});

type EditFormValues = z.infer<typeof editFormSchema>;

export default function ManageBookingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<typeof mockReservation | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  
  const searchForm = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      email: "",
      confirmationCode: "",
    },
  });
  
  const editForm = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guestCount: 0,
      dietaryRestrictions: "",
      specialRequests: "",
    },
  });
  
  function onSearchSubmit(data: SearchFormValues) {
    console.log("Search data:", data);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setReservation(mockReservation);
      setIsLoading(false);
    }, 1000);
  }
  
  function openEditDialog() {
    if (!reservation) return;
    
    editForm.reset({
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      guestCount: reservation.guestCount,
      dietaryRestrictions: reservation.dietaryRestrictions || "",
      specialRequests: reservation.specialRequests || "",
    });
    
    setIsEditDialogOpen(true);
  }
  
  function onEditSubmit(data: EditFormValues) {
    console.log("Edit data:", data);
    
    // Simulate API update
    setTimeout(() => {
      setReservation({
        ...reservation!,
        ...data,
      });
      setIsEditDialogOpen(false);
    }, 500);
  }
  
  function onDeleteConfirm() {
    console.log("Deleting reservation");
    
    // Simulate API delete
    setTimeout(() => {
      setIsDeleteDialogOpen(false);
      setDeleteSuccess(true);
      setReservation(null);
    }, 500);
  }
  
  return (
    <div className="container py-16 md:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Manage Your RSVP</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Need to view, update, or cancel your RSVP? Enter your details below.
        </p>
      </motion.div>
      
      {deleteSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-chart-2" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">RSVP Cancelled</h2>
          <p className="text-muted-foreground mb-8">
            Your RSVP has been successfully cancelled. We're sorry you won't be able to join us.
          </p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </motion.div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 h-auto">
              <TabsTrigger value="search" className="py-3">Search for RSVP</TabsTrigger>
              <TabsTrigger value="details" className="py-3" disabled={!reservation}>RSVP Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Find Your Reservation</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...searchForm}>
                    <form onSubmit={searchForm.handleSubmit(onSearchSubmit)} className="space-y-6">
                      <FormField
                        control={searchForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={searchForm.control}
                        name="confirmationCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmation Code (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., RES123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            Searching...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Search className="mr-2 h-4 w-4" />
                            Find Reservation
                          </div>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="mt-6">
              {reservation && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>Your Reservation</CardTitle>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={openEditDialog}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => setIsDeleteDialogOpen(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel RSVP
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                          <p className="text-lg">{reservation.name}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                          <p className="text-lg">{reservation.email}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                          <p className="text-lg">{reservation.phone}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 text-chart-2 mr-2 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Event Date</h3>
                            <p className="text-lg">June 15, 2025 at 7:00 PM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Users className="h-5 w-5 text-chart-1 mr-2 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Number of Guests</h3>
                            <p className="text-lg">{reservation.guestCount + 1} (You + {reservation.guestCount})</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                          <div className="mt-1 flex items-center">
                            {reservation.status === "confirmed" ? (
                              <>
                                <CheckCircle2 className="h-5 w-5 text-chart-2 mr-2" />
                                <span className="text-chart-2 font-medium">Confirmed</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-5 w-5 text-destructive mr-2" />
                                <span className="text-destructive font-medium">Cancelled</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Dietary Restrictions</h3>
                        <p className="text-muted-foreground mt-1">
                          {reservation.dietaryRestrictions || "None specified"}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Special Requests</h3>
                        <p className="text-muted-foreground mt-1">
                          {reservation.specialRequests || "None specified"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Your RSVP</DialogTitle>
                <DialogDescription>
                  Make changes to your reservation details below.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...editForm}>
                <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-6">
                  <FormField
                    control={editForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={editForm.control}
                    name="guestCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Additional Guests</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={0} 
                            max={2} 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="dietaryRestrictions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Restrictions</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editForm.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-chart-2 hover:bg-chart-2/90 text-white">
                      Save Changes
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          {/* Delete Confirmation Dialog */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Your RSVP?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel your RSVP? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep My RSVP</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Yes, Cancel RSVP
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}